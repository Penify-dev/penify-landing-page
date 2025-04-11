import { inHouseAnalytics } from "@/utils/gtag";
import { sendGAEvent } from "@next/third-parties/google";
import LiteYouTubeEmbed, { imgResolution } from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

interface YoutubeEmbedType {
  videoId: string;
  title: string;
  poster: imgResolution;
}

/**
 * Renders a YouTube video embed component with tracking capabilities.
 *
 * @param {YoutubeEmbedType} props - The properties required to render the component.
 * @param {string} props.videoId - The ID of the YouTube video to be embedded.
 * @param {string} props.title - The title of the YouTube video, used for accessibility and analytics.
 * @param {string} props.poster - The URL of the poster image for the video thumbnail.
 */
export function YoutubeEmbed({ videoId, title, poster }: YoutubeEmbedType) {
  /**
   * Handles the play event by sending analytics to both Google Analytics (GA) and an internal in-house analytics system.
   *
   * @function
   * @name handlePlay
   * @description Triggers the necessary functions to log a video view event with Google Analytics and an internal in-house analytics system.
   */
  const handlePlay = () => {
    sendGAEvent("event", "video_view");
    inHouseAnalytics("video_view",{"videoId": "-1"})
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
