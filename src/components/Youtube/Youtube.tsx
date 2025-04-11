import { mp_track_video_play } from "@/lib/mixpanel";
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
 * Renders a YouTube video embed component.
 *
 * @param {Object} props - The properties for the YoutubeEmbed component.
 * @param {string} props.videoId - The unique identifier for the YouTube video.
 * @param {string} props.title - The title of the YouTube video.
 * @param {string} props.poster - The URL of the poster image for the video.
 * @returns {JSX.Element} - A JSX element representing the YouTube embed component.
 *
 * Example:
 * <YoutubeEmbed videoId="dQw4w9WgXcQ" title="Rick Astley - Never Gonna Give You Up (Official Music Video)" poster="https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg" />
 */
export function YoutubeEmbed({ videoId, title, poster }: YoutubeEmbedType) {
  /**
   * Handles the play event by sending analytics events to various tracking systems.
   *
   * @function handlePlay
   * @summary Triggers analytics events for video playback.
   * @returns {void} This function does not return any value.
   */
  const handlePlay = () => {
    sendGAEvent("event", "video_view");
    mp_track_video_play()
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
