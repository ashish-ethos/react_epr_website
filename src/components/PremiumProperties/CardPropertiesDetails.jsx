import React from "react";
import {
  MapPin,
  Home,
  Star,
  Eye,
  Calendar,
  ExternalLink,
  MapPinned,
  CheckCircle,
  Dumbbell,
  Car,
  Trees,
  Wifi,
  ShieldCheck,
} from "lucide-react";
import ContactForm from "../../pages/Contact/ContactForm";
import "./PremiumProperties.css";
import CustomButton from "../ui/Button";

const CardPropertiesDetails = ({ property }) => {
  if (!property) {
    return (
      <div className="flex items-center justify-center p-8 bg-[#333] rounded-lg border border-[#ffffff38]">
        <div className="text-center">
          <Home className="mx-auto h-12 w-12 text-[#c2c6cb] mb-4" />
          <p className="text-[#c2c6cb] text-lg">No property details available.</p>
        </div>
      </div>
    );
  }

  const handleViewMap = () => {
    const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
      property.location.full
    )}&output=embed`;
    window.open(mapUrl, "_blank");
  };

  const getAmenityIcon = (amenity) => {
    const key = amenity.toLowerCase();
    if (key.includes("gym") || key.includes("fitness")) return <Dumbbell className="w-4 h-4 text-[#c99913]" />;
    if (key.includes("parking")) return <Car className="w-4 h-4 text-[#c99913]" />;
    if (key.includes("garden") || key.includes("park")) return <Trees className="w-4 h-4 text-[#c99913]" />;
    if (key.includes("wifi") || key.includes("internet")) return <Wifi className="w-4 h-4 text-[#c99913]" />;
    if (key.includes("security")) return <ShieldCheck className="w-4 h-4 text-[#c99913]" />;
    return <CheckCircle className="w-4 h-4 text-[#c99913]" />;
  };

  return (
    <div className="max-w-7xl mx-auto bg-[#333] shadow-sm border border-[#ffffff38] overflow-y-auto custom-scrollbar scrollbar-thin ">
      {/* Header Section */}
      <div className="bg-[#1b1b1b] px-6 py-4 border-b border-[#ffffff38] mobile-header-premium">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#c2c6cb] mobile-cardporperties-name">{property.name}</h1>
          {property.featured && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#c99913]/20 text-[#c99913]">
              <Star className="w-4 h-4 mr-1" />
              Featured
            </span>
          )}
        </div>
        <div className="flex items-center mt-2 text-[#c2c6cb]">
          <MapPin className="w-5 h-5 mr-2 text-[#c99913]" />
          <span className="text-sm">{property.location.full}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 mobile-main-content-premium">
        {/* Property Image */}
        <div className="mb-8 relative">
          <img
            src={property.image}
            alt={property.name}
            className="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg"
          />

          <div className="absolute inset-0 flex gap-2 p-2 md:p-4 mobile-property-tags justify-between">
            {/* Property Type */}
            <div>
              <span className="inline-flex items-center px-2 py-0.5 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-semibold bg-[#16a34a]/20 text-[#c2c6cb] backdrop-blur-sm">
                {property.type}
              </span>
            </div>
            {/* Rating & Views */}
            <div>
              <div className="flex flex-row items-center bg-[#333]/90 backdrop-blur-md rounded-full shadow-lg overflow-hidden border border-[#ffffff38]">
                <div className="flex items-center gap-1 px-2 py-0.5 md:px-3 md:py-1 hover:bg-[#444]">
                  <Star className="w-3 h-3 md:w-4 md:h-4 text-[#c99913]" />
                  <span className="text-xs md:text-sm font-semibold text-[#c2c6cb]">{property.rating}</span>
                  <span className="text-[10px] md:text-[11px] text-[#c2c6cb]/80">Rating</span>
                </div>
                <div className="h-px md:h-5 md:w-px bg-[#ffffff38] mx-2 md:mx-0"></div>
                <div className="flex items-center gap-1 px-2 py-0.5 md:px-3 md:py-1 hover:bg-[#444]">
                  <Eye className="w-3 h-3 md:w-4 md:h-4 text-[#c99913]" />
                  <span className="text-xs md:text-sm font-semibold text-[#c2c6cb]">{property.views}</span>
                  <span className="text-[10px] md:text-[11px] text-[#c2c6cb]/80">Views</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 mb-4">
          {/* Property Details */}
          <div className="bg-[#1b1b1b] rounded-lg p-3 border border-[#ffffff38]">
            <h4 className="text-lg font-semibold text-[#c2c6cb] mb-4 flex items-center border-b border-[#ffffff38] pb-2">
              <Home className="w-5 h-5 mr-2 text-[#c99913]" />
              Property Details
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-[#ffffff38]">
                <span className="text-sm font-medium text-[#c2c6cb]/80">Price</span>
                <span className="text-lg font-bold text-[#c99913]">{property.price}</span>
              </div>
             
              <div className="flex justify-between py-2 border-b border-[#ffffff38]">
                <span className="text-sm font-medium text-[#c2c6cb]/80">Area</span>
                <span className="text-sm text-[#c2c6cb]">{property.area}</span>
              </div>
              {property.configurations && (
                <div className="flex justify-between py-2 border-b border-[#ffffff38]">
                  <span className="text-sm font-medium text-[#c2c6cb]/80">Configurations</span>
                  <span className="text-sm text-[#c2c6cb]">{property.configurations}</span>
                </div>
              )}
              <div className="flex justify-between py-2">
                <span className="text-sm font-medium text-[#c2c6cb]/80 flex items-center">
                  <Calendar className="w-4 h-4 mr-1 text-[#c99913]" />
                  Updated
                </span>
                <span className="text-sm text-[#c2c6cb]">{property.updatedOn}</span>
              </div>
            </div>
          </div>

          {/* Location Details */}
          <div className="bg-[#1b1b1b] rounded-lg p-3 border border-[#ffffff38]">
            <h4 className="text-lg font-semibold text-[#c2c6cb] mb-4 flex items-center border-b border-[#ffffff38] pb-2">
              <MapPin className="w-5 h-5 mr-2 text-[#c99913]" />
              Location Details
            </h4>
            <div className="space-y-3">
              <p className="text-sm text-[#c2c6cb]">{property.location.address || property.location.full}</p>
              <div className="grid grid-cols-2 gap-2 text-sm text-[#c2c6cb] tablet-location-grid">
                <span className="text-sm fontFamily-bebas text-center shadow-sm p-2 bg-[#333] rounded-md border border-[#ffffff38] hover:shadow-[0_0_10px_rgba(201,153,19,0.2)] hover:bg-[#444] transition-all">City: {property.location.city}</span>
                <span className="text-sm fontFamily-bebas text-center shadow-sm p-2 bg-[#333] rounded-md border border-[#ffffff38] hover:shadow-[0_0_10px_rgba(201,153,19,0.2)] hover:bg-[#444] transition-all">State: {property.location.state}</span>
                <span className="text-sm fontFamily-bebas text-center shadow-sm p-2 bg-[#333] rounded-md border border-[#ffffff38] hover:shadow-[0_0_10px_rgba(201,153,19,0.2)] hover:bg-[#444] transition-all">Area: {property.location.area}</span>
                <span className="text-sm fontFamily-bebas text-center shadow-sm p-2 bg-[#333] rounded-md border border-[#ffffff38] hover:shadow-[0_0_10px_rgba(201,153,19,0.2)] hover:bg-[#444] transition-all">Country: {property.location.country}</span>
              </div>
              <CustomButton
                onClick={handleViewMap}
                className="inline-flex cursor-pointer items-center gap-2 px-4 py-2 mt-3 bg-[#333] text-[#c2c6cb] font-medium rounded-full border border-[#ffffff38] "
              >
                <MapPinned className="w-5 h-5 text-[#c99913]" />
                View on Map
                <ExternalLink className="w-4 h-4 text-[#c2c6cb]/80" />
              </CustomButton>
            </div>
          </div>

          {/* Amenities */}
          <div className="bg-[#1b1b1b] rounded-lg p-3 border border-[#ffffff38]">
            <h4 className="text-lg font-semibold text-[#c2c6cb] mb-4 flex items-center border-b border-[#ffffff38] pb-2">
              <Home className="w-5 h-5 mr-2 text-[#c99913]" />
              Amenities
            </h4>
            <div className="grid grid-cols-2 gap-3 tablet-location-grid">
              {property.amenities?.map((amenity, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm text-[#c2c6cb] shadow-sm p-2 bg-[#333] rounded-md border border-[#ffffff38] hover:shadow-[0_0_10px_rgba(201,153,19,0.2)] hover:bg-[#444] transition-all">
                  {getAmenityIcon(amenity)}
                  {amenity}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row 2: Contact Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#1b1b1b] rounded-xl p-2 border border-[#ffffff38]">
            <ContactForm propertyId={property.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPropertiesDetails;