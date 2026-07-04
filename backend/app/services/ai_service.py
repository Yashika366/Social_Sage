class AIService:

    def analyze_channel(self, channel_data: dict, videos_data: list = []):
        """
        Mock AI analysis - returns realistic fake recommendations
        based on the real channel data we fetched from YouTube.
        We'll replace this with real OpenAI calls later.
        """

        # Calculate real metrics from actual YouTube data
        subscriber_count = channel_data.get("subscriber_count", 0)
        video_count = channel_data.get("video_count", 0)
        view_count = channel_data.get("view_count", 0)

        # Calculate average views per video - real math on real data
        avg_views_per_video = 0
        if video_count > 0:
            avg_views_per_video = view_count // video_count

        # Calculate engagement from recent videos if available
        avg_likes = 0
        avg_comments = 0
        avg_video_views = 0

        if videos_data:
            avg_video_views = sum(v.get("view_count", 0) for v in videos_data) // len(videos_data)
            avg_likes = sum(v.get("like_count", 0) for v in videos_data) // len(videos_data)
            avg_comments = sum(v.get("comment_count", 0) for v in videos_data) // len(videos_data)

        # Engagement rate - real calculation
        engagement_rate = 0
        if avg_video_views > 0:
            engagement_rate = round((avg_likes + avg_comments) / avg_video_views * 100, 2)

        # Growth score - simple formula based on real numbers
        # We'll make this smarter with real AI later
        growth_score = 50  # base score

        # Boost score based on engagement rate
        if engagement_rate > 5:
            growth_score += 20
        elif engagement_rate > 2:
            growth_score += 10

        # Boost score based on views per video vs subscribers ratio
        if subscriber_count > 0:
            views_to_subs_ratio = avg_views_per_video / subscriber_count
            if views_to_subs_ratio > 0.5:
                growth_score += 20
            elif views_to_subs_ratio > 0.2:
                growth_score += 10

        # Cap score at 100
        growth_score = min(growth_score, 100)

        # Build mock response using real channel data
        # so the recommendations feel relevant even without OpenAI
        channel_name = channel_data.get("title", "Your Channel")

        return {
            "growth_score": growth_score,

            "summary": f"{channel_name} has {subscriber_count:,} subscribers and {video_count} videos with an average of {avg_views_per_video:,} views per video. The channel shows {'strong' if engagement_rate > 3 else 'moderate'} engagement with a {engagement_rate}% engagement rate.",

            "strengths": [
                f"Strong total view count of {view_count:,} shows content is reaching audiences",
                f"Engagement rate of {engagement_rate}% indicates viewers are interacting with content" if engagement_rate > 0 else "Channel has an established subscriber base to build upon",
            ],

            "weaknesses": [
                "Upload consistency could be improved to maintain algorithm favor",
                "Video SEO and thumbnail optimization could increase click-through rate",
            ],

            "recommendations": [
                {
                    "priority": "High",
                    "title": "Improve Upload Consistency",
                    "description": "Establish a fixed upload schedule (e.g. every Tuesday and Friday). YouTube's algorithm heavily favors channels that upload consistently.",
                    "expected_impact": "Consistent uploading can increase subscriber growth rate by up to 40%"
                },
                {
                    "priority": "Medium",
                    "title": "Optimize Video Thumbnails",
                    "description": "Use high contrast colors, readable text under 6 words, and faces showing emotion. A/B test thumbnails using YouTube Studio.",
                    "expected_impact": "Better thumbnails can improve click-through rate from 2% to 6-8%"
                },
                {
                    "priority": "Low",
                    "title": "Add End Screens and Cards",
                    "description": "Add end screens to every video linking to your best performing videos. This keeps viewers on your channel longer.",
                    "expected_impact": "End screens typically increase session watch time by 15-20%"
                }
            ],

            "content_strategy": f"Focus on your best performing content format and double down on it. With {subscriber_count:,} subscribers, you have enough of an audience to test new content types monthly while maintaining your core content style.",

            "upload_frequency_advice": f"With {video_count} total videos, aim to upload at least 2 times per week to maximize algorithm reach. Quality over quantity — but consistency beats both.",

            # Flag so we know this is mock data, not real AI
            # We'll remove this field when we switch to real OpenAI
            "is_mock": True
        }


# Singleton instance - same as before
ai_service = AIService()