from openai import OpenAI
from app.config.settings import settings

# Initialize the OpenAI client with our API key from .env
client = OpenAI(api_key=settings.OPENAI_API_KEY)

class AIService:

    def analyze_channel(self, channel_data: dict, videos_data: list = []):
        """
        Takes raw YouTube channel stats and returns
        AI-powered insights and recommendations
        """

        # Calculate some derived metrics before sending to AI
        # These give the AI more meaningful numbers to work with

        # Engagement rate = average likes+comments per video / subscribers * 100
        # Only calculate if we have video data
        avg_views = 0
        avg_likes = 0
        avg_comments = 0

        if videos_data:
            avg_views = sum(v.get("view_count", 0) for v in videos_data) // len(videos_data)
            avg_likes = sum(v.get("like_count", 0) for v in videos_data) // len(videos_data)
            avg_comments = sum(v.get("comment_count", 0) for v in videos_data) // len(videos_data)

        # Engagement rate formula: (likes + comments) / views * 100
        engagement_rate = 0
        if avg_views > 0:
            engagement_rate = round((avg_likes + avg_comments) / avg_views * 100, 2)

        # Build the prompt - this is the most important part of the AI layer
        # The quality of recommendations depends entirely on how well we describe
        # the channel's situation to the AI
        prompt = f"""
You are SocialSage, an expert YouTube growth analyst and content strategist.

Analyze the following YouTube channel data and provide specific, actionable recommendations.

CHANNEL DATA:
- Channel Name: {channel_data.get('title', 'Unknown')}
- Subscribers: {channel_data.get('subscriber_count', 0):,}
- Total Views: {channel_data.get('view_count', 0):,}
- Total Videos: {channel_data.get('video_count', 0)}
- Country: {channel_data.get('country', 'Unknown')}
- Channel Created: {channel_data.get('published_at', 'Unknown')}
- Keywords/Tags: {channel_data.get('keywords', 'None')}

RECENT VIDEO PERFORMANCE (last {len(videos_data)} videos):
- Average Views per Video: {avg_views:,}
- Average Likes per Video: {avg_likes:,}
- Average Comments per Video: {avg_comments:,}
- Engagement Rate: {engagement_rate}%

Based on this data, provide a JSON response with exactly this structure:
{{
    "growth_score": <number 0-100 representing overall channel health>,
    "summary": "<2-3 sentence overview of the channel's current situation>",
    "strengths": [
        "<specific strength based on the data>",
        "<specific strength based on the data>"
    ],
    "weaknesses": [
        "<specific weakness based on the data>",
        "<specific weakness based on the data>"
    ],
    "recommendations": [
        {{
            "priority": "High",
            "title": "<short action title>",
            "description": "<specific actionable advice>",
            "expected_impact": "<what improvement to expect>"
        }},
        {{
            "priority": "Medium", 
            "title": "<short action title>",
            "description": "<specific actionable advice>",
            "expected_impact": "<what improvement to expect>"
        }},
        {{
            "priority": "Low",
            "title": "<short action title>",
            "description": "<specific actionable advice>",
            "expected_impact": "<what improvement to expect>"
        }}
    ],
    "content_strategy": "<2-3 sentences on what type of content to focus on>",
    "upload_frequency_advice": "<specific advice on how often to upload>"
}}

Return ONLY the JSON object, no extra text before or after it.
"""

        # Send to OpenAI
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            # gpt-3.5-turbo = cheaper, faster, good enough for structured analysis
            # gpt-4 = smarter but costs more - switch later if needed
            messages=[
                {
                    # system message sets the AI's role and behavior
                    "role": "system",
                    "content": "You are an expert YouTube growth analyst. Always respond with valid JSON only."
                },
                {
                    # user message is the actual prompt with the channel data
                    "role": "user",
                    "content": prompt
                }
            ],
            # temperature controls randomness - 0.7 = balanced between creative and consistent
            # 0 = very consistent/deterministic, 1 = very creative/random
            temperature=0.7,
            max_tokens=1000
        )

        # Extract the text response from OpenAI's response object
        raw_response = response.choices[0].message.content

        # Parse the JSON string into a Python dictionary
        import json
        try:
            analysis = json.loads(raw_response)
        except json.JSONDecodeError:
            # If AI didn't return valid JSON (rare), return a fallback
            analysis = {
                "growth_score": 50,
                "summary": "Analysis completed but formatting error occurred.",
                "strengths": [],
                "weaknesses": [],
                "recommendations": [],
                "content_strategy": "Please try again.",
                "upload_frequency_advice": "Please try again."
            }

        return analysis


# Singleton instance
ai_service = AIService()