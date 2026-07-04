# APIRouter lets us group related routes together
# instead of putting everything directly on the main app object
from fastapi import APIRouter, HTTPException

# Import our YouTube service
from app.services.youtube_service import youtube_service

# Import our database collections to store fetched data
from app.database.connection import channels_collection, videos_collection

# datetime to timestamp when data was fetched
from datetime import datetime

# Create a router with a prefix - every route in this file starts with /youtube
# so get_channel becomes GET /youtube/channel/{channel_id}
router = APIRouter(prefix="/youtube", tags=["YouTube"])


@router.get("/channel/{channel_id}")
async def get_channel(channel_id: str):
    """
    Fetches YouTube channel stats and stores them in MongoDB
    channel_id = the YouTube channel ID (starts with UC...)
    Example: GET /youtube/channel/UCxxxxxxxxxxxxxxxxxxxxxx
    """
    try:
        # 1. Fetch from YouTube API
        channel_data = youtube_service.get_channel_stats(channel_id)

        # 2. If channel not found, return 404
        if not channel_data:
            # HTTPException is FastAPI's way of returning error responses
            # 404 = Not Found, detail = the error message sent to the client
            raise HTTPException(status_code=404, detail="Channel not found")

        # 3. Add a timestamp so we know when this data was fetched
        channel_data["fetched_at"] = datetime.utcnow()

        # 4. Store in MongoDB
        # update_one with upsert=True means:
        # - if a document with this channel_id exists, UPDATE it
        # - if it doesn't exist yet, INSERT it (upsert = update + insert)
        # This way we never have duplicate entries for the same channel
        await channels_collection.update_one(
            {"channel_id": channel_id},  # find document where channel_id matches
            {"$set": channel_data},       # set/update all these fields
            upsert=True                   # create if doesn't exist
        )

        # 5. Return the data to the frontend
        return {
            "success": True,
            "data": channel_data
        }

    except HTTPException:
        # re-raise HTTPExceptions without wrapping them
        raise
    except Exception as e:
        # Any other error (YouTube API down, network issue etc)
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/channel/{channel_id}/videos")
async def get_channel_videos(channel_id: str, max_results: int = 10):
    """
    Fetches recent videos for a channel AND their statistics
    Combines two YouTube API calls into one clean response
    """
    try:
        # 1. Get list of recent videos (title, thumbnail etc)
        videos = youtube_service.get_channel_videos(channel_id, max_results)

        if not videos:
            return {"success": True, "data": []}

        # 2. Extract just the video IDs from the list
        video_ids = [v["video_id"] for v in videos]

        # 3. Get statistics for all those videos in one API call
        stats = youtube_service.get_video_stats(video_ids)

        # 4. Merge stats into the videos list
        # Build a dict of stats keyed by video_id for fast lookup
        stats_map = {s["video_id"]: s for s in stats}

        # Combine each video's basic info with its statistics
        for video in videos:
            vid_id = video["video_id"]
            if vid_id in stats_map:
                # {**video, **stats_map[vid_id]} merges two dicts
                # if both have same key, the right dict wins
                video.update(stats_map[vid_id])
            video["channel_id"] = channel_id
            video["fetched_at"] = datetime.utcnow()

        # 5. Store all videos in MongoDB
        for video in videos:
            await videos_collection.update_one(
                {"video_id": video["video_id"]},
                {"$set": video},
                upsert=True
            )

        return {
            "success": True,
            "count": len(videos),
            "data": videos
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))