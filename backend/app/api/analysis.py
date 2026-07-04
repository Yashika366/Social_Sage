from fastapi import APIRouter, HTTPException
from app.services.ai_service import ai_service
from app.services.youtube_service import youtube_service
from app.database.connection import channels_collection, insights_collection
from datetime import datetime

router = APIRouter(prefix="/analysis", tags=["Analysis"])

@router.get("/channel/{channel_id}")
async def analyze_channel(channel_id: str):
    """
    Full pipeline:
    1. Fetch channel stats from YouTube API
    2. Fetch recent videos from YouTube API  
    3. Send everything to OpenAI for analysis
    4. Store results in MongoDB
    5. Return insights to frontend
    """
    try:
        # Step 1 - Get channel data
        # First check if we already have it in MongoDB (saves API quota)
        channel_data = await channels_collection.find_one(
            {"channel_id": channel_id},
            # {"_id": 0} tells MongoDB to exclude the _id field from results
            # MongoDB's _id is an ObjectId which isn't JSON serializable
            {"_id": 0}
        )

        # If not in database, fetch from YouTube API fresh
        if not channel_data:
            channel_data = youtube_service.get_channel_stats(channel_id)
            if not channel_data:
                raise HTTPException(status_code=404, detail="Channel not found")

        # Step 2 - Get recent videos
        videos = youtube_service.get_channel_videos(channel_id, max_results=10)
        if videos:
            video_ids = [v["video_id"] for v in videos]
            stats = youtube_service.get_video_stats(video_ids)
            stats_map = {s["video_id"]: s for s in stats}
            for video in videos:
                if video["video_id"] in stats_map:
                    video.update(stats_map[video["video_id"]])

        # Step 3 - Send to OpenAI for analysis
        analysis = ai_service.analyze_channel(channel_data, videos)

        # Step 4 - Store insights in MongoDB
        insight_doc = {
            "channel_id": channel_id,
            "channel_title": channel_data.get("title", ""),
            "analysis": analysis,
            "analyzed_at": datetime.utcnow()
        }

        await insights_collection.update_one(
            {"channel_id": channel_id},
            {"$set": insight_doc},
            upsert=True
        )

        # Step 5 - Return to frontend
        return {
            "success": True,
            "channel": channel_data,
            "analysis": analysis
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))