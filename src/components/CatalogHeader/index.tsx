import { Rating, Star } from "@smastrom/react-rating";
import { CircleCheck, CircleX, Hourglass, MapPin, Timer } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useBusinessStatus } from "../../hooks/useBusinessStatus";
import type { BusinessStatusName } from "../../config/business-hours";
import { HERO_VIDEO } from "../../config/hero-videos";
import "@smastrom/react-rating/style.css";
import "./CatalogHeader.css";

const ratingStyles = {
  itemShapes: Star,
  activeFillColor: "#f0a83e",
  inactiveFillColor: "rgba(240, 168, 62, 0.2)",
};

const statusIcons: Record<BusinessStatusName, LucideIcon> = {
  opening: Hourglass,
  open: CircleCheck,
  closing: Timer,
  closed: CircleX,
};

function CatalogHeader() {
  const businessStatus = useBusinessStatus();
  const StatusIcon = statusIcons[businessStatus.state];

  return (
    <header className="catalog-hero">
      <video
        aria-hidden="true"
        autoPlay
        className="catalog-hero-background"
        loop
        muted
        playsInline
        src={HERO_VIDEO.source}
      />
      <div className="catalog-hero-content">
        <p className="catalog-hero-eyebrow">Bar & cozinha</p>
        <h1>
          Bar <span>Brasa</span>
        </h1>

        <div className="catalog-hero-facts">
          <div className="catalog-hero-fact">
            <MapPin aria-hidden="true" />
            <div>
              <strong>Jundiaí · SP</strong>
              <small>Localização</small>
            </div>
          </div>
          <div className="catalog-hero-fact catalog-hero-rating">
            <div>
              <strong>
                <Rating
                  className="catalog-hero-stars"
                  itemStyles={ratingStyles}
                  readOnly
                  value={4.5}
                />
                <b>4,5</b>
              </strong>
              <small>Avaliação dos clientes</small>
            </div>
          </div>
          <div className={`catalog-hero-fact catalog-hero-status is-${businessStatus.state}`}>
            <StatusIcon aria-hidden="true" />
            <div>
              <strong>{businessStatus.label}</strong>
              <small>{businessStatus.detail}</small>
            </div>
          </div>
        </div>

        <div className="catalog-hero-divider" />
        <div className="catalog-hero-highlights" aria-label="Destaques do estabelecimento">
          <span>Cozinha artesanal</span>
          <span>Chope gelado</span>
          <span>Ambiente casual</span>
        </div>
      </div>
    </header>
  );
}

export default CatalogHeader;
