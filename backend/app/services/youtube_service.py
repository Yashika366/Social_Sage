# googleapiclient is the official Google API Python library we installed earlier
from googleapiclient.discovery import build
# HTTPError handles cases where the YouTube API returns an error response
from googleapiclient.errors import HttpError
# Our settings object to read the API key from .env
from app.config.settings import settings

class YouTubeService:
    def __init__(self):
        # build() creates a YouTube API client
        # "youtube" = which Google API to use
        # "v3" = which version
        # developerKey = our API key from .env
        self.youtube = build(
            "youtube",
            "v3",
            developerKey=settings.YOUTUBE_API_KEY
        )

    def get_channel_stats(self, channel_id: str):
        """
        Fetches public statistics for a YouTube channel by its ID
        channel_id examples:
        - UCxxxxxxxxxxxxxxxxxxxxxx (starts with UC)
        - or a custom handle like @MrBeast (we handle both below)
        """
        try:
            # .channels() = the channels endpoint of YouTube Data API
            # .list() = we want to list/fetch channel data
            # part = which sections of data to fetch (each part costs API quota)
            #   "snippet" = basic info: title, description, country, thumbnails
            #   "statistics" = subscriber count, view count, video count
            #   "brandingSettings" = channel keywords, banner image
            # id = the channel ID we're looking up
            request = self.youtube.channels().list(
                part="snippet,statistics,brandingSettings",
                id=channel_id
            )
            # execute() actually sends the HTTP request to YouTube's servers
            response = request.execute()

            # response["items"] is a list of channels that matched
            # if empty, the channel ID doesn't exist
            if not response.get("items"):
                return None

            # We only asked for one channel so take the first item
            channel = response["items"][0]

            # Extract the three sections we requested
            snippet = channel.get("snippet", {})
            statistics = channel.get("statistics", {})
            branding = channel.get("brandingSettings", {}).get("channel", {})

            # Build a clean, flat dictionary from the nested YouTube response
            # This is what we'll store in MongoDB and send to the frontend
            return {
                "channel_id": channel_id,
                "title": snippet.get("title", ""),
                "description": snippet.get("description", ""),
                "country": snippet.get("country", "Unknown"),
                "published_at": snippet.get("publishedAt", ""),
                "thumbnail": snippet.get("thumbnails", {}).get("high", {}).get("url", ""),
                "keywords": branding.get("keywords", ""),
                # int() converts YouTube's string numbers to actual integers
                # YouTube returns "1234567" as a string, not a number
                "subscriber_count": int(statistics.get("subscriberCount", 0)),
                "view_count": int(statistics.get("viewCount", 0)),
                "video_count": int(statistics.get("videoCount", 0)),
                # hiddenSubscriberCount = True means channel hides subscriber count (like YouTube itself)
                "hidden_subscriber_count": statistics.get("hiddenSubscriberCount", False),
            }

        except HttpError as e:
            # HttpError means YouTube's API returned an error
            # e.resp.status = the HTTP status code (403 = quota exceeded, 404 = not found)
            print(f"YouTube API error: {e.resp.status} - {e.content}")
            raise Exception(f"YouTube API error: {e.resp.status}")

    def get_channel_videos(self, channel_id: str, max_results: int = 10):
        """
        Fetches the most recent videos from a channel
        max_results = how many videos to fetch (default 10, max 50)
        """
        try:
            # search().list() finds videos - more flexible than videos().list()
            # part="snippet" = title, description, thumbnail, publishedAt
            # channelId = only return videos from this channel
            # order="date" = newest videos first
            # type="video" = only return videos, not playlists or channels
            request = self.youtube.search().list(
                part="snippet",
                channelId=channel_id,
                order="date",
                type="video",
                maxResults=max_results
            )
            response = request.execute()

            videos = []
            for item in response.get("items", []):
                snippet = item.get("snippet", {})
                videos.append({
                    # videoId is nested inside "id" object for search results
                    "video_id": item["id"]["videoId"],
                    "title": snippet.get("title", ""),
                    "description": snippet.get("description", ""),
                    "published_at": snippet.get("publishedAt", ""),
                    "thumbnail": snippet.get("thumbnails", {}).get("high", {}).get("url", ""),
                })

            return videos

        except HttpError as e:
            print(f"YouTube API error: {e.resp.status} - {e.content}")
            raise Exception(f"YouTube API error: {e.resp.status}")

    def get_video_stats(self, video_ids: list):
        """
        Fetches detailed statistics for a list of video IDs
        video_ids = list of YouTube video IDs like ["dQw4w9WgXcQ", "abc123"]
        We fetch stats separately because search().list() doesn't return statistics
        """
        try:
            # Join video IDs with comma - YouTube API accepts multiple IDs at once
            # This saves API quota vs fetching each video one by one
            ids_string = ",".join(video_ids)

            request = self.youtube.videos().list(
                part="statistics,contentDetails",
                # contentDetails gives us video duration
                id=ids_string
            )
            response = request.execute()

            video_stats = []
            for item in response.get("items", []):
                stats = item.get("statistics", {})
                details = item.get("contentDetails", {})
                video_stats.append({
                    "video_id": item["id"],
                    "view_count": int(stats.get("viewCount", 0)),
                    "like_count": int(stats.get("likeCount", 0)),
                    "comment_count": int(stats.get("commentCount", 0)),
                    # duration comes in ISO 8601 format like "PT4M32S" (4 minutes 32 seconds)
                    "duration": details.get("duration", ""),
                })

            return video_stats

        except HttpError as e:
            print(f"YouTube API error: {e.resp.status} - {e.content}")
            raise Exception(f"YouTube API error: {e.resp.status}")


# Create one shared instance - same singleton pattern as settings
# Every file that needs YouTube data imports this one object
youtube_service = YouTubeService()