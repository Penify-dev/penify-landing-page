import { mp_track_video_play } from "@/lib/mixpanel";
import { sendGAEvent } from "@next/third-parties/google";
import LiteYouTubeEmbed, { imgResolution } from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

interface YoutubeEmbedType {
  videoId: string;
  title: string;
  poster: imgResolution;
}

export function YoutubeEmbed({ videoId, title, poster }: YoutubeEmbedType) {
  const handlePlay = () => {
    sendGAEvent("event", "video_view");
    mp_track_video_play()
  };

  return (
    <LiteYouTubeEmbed
      id={videoId}
      title={title}
      poster={poster}
      cookie={true}
      webp
      onIframeAdded={handlePlay}
    />
  );
}
