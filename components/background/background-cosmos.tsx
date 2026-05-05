import { AuroraBlobs } from "./aurora-blobs";
import { ShootingStars } from "./shooting-stars";
import { Starfield } from "./starfield";

export function BackgroundCosmos() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <AuroraBlobs />
      <Starfield />
      <ShootingStars />
    </div>
  );
}
