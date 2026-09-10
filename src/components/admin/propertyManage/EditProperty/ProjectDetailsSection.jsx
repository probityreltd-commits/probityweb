import SectionCard from "./SectionCard";

const inputCls =
  "w-full px-3.5 py-2.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#3b1a83]/30";

const Field = ({ label, children }) => (
  <div>
    <label className="block text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
      {label}
    </label>
    {children}
  </div>
);

const ProjectDetailsSection = ({ formData, handleChange }) => (
  <SectionCard
    number={5}
    title="Project Details"
    description="Specify dimensions, parking, and unit breakdown specifications"
  >
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Field label="Land Area">
          <input
            type="text"
            name="landArea"
            value={formData.landArea}
            onChange={handleChange}
            placeholder="e.g. 4.96 Decimal"
            className={inputCls}
          />
        </Field>
        <Field label="Building Height">
          <input
            type="text"
            name="buildingHeight"
            value={formData.buildingHeight}
            onChange={handleChange}
            placeholder="e.g. G+8"
            className={inputCls}
          />
        </Field>
        <Field label="Total Apartments">
          <input
            type="number"
            min="0"
            name="apartments"
            value={formData.apartments}
            onChange={handleChange}
            placeholder="e.g. 10"
            className={inputCls}
          />
        </Field>
        <Field label="Car Parking">
          <input
            type="text"
            name="carParking"
            value={formData.carParking}
            onChange={handleChange}
            placeholder="e.g. Ground Floor"
            className={inputCls}
          />
        </Field>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <Field label="Motorbike Parking">
          <input
            type="text"
            name="motorbikeParking"
            value={formData.motorbikeParking}
            onChange={handleChange}
            placeholder="e.g. Ground Floor"
            className={inputCls}
          />
        </Field>
        <Field label="Units Per Floor">
          <input
            type="number"
            min="0"
            name="unitsPerFloor"
            value={formData.unitsPerFloor}
            onChange={handleChange}
            placeholder="e.g. 2"
            className={inputCls}
          />
        </Field>
        <Field label="Apartment Sizes Breakdown">
          <input
            type="text"
            name="apartmentSizes"
            value={formData.apartmentSizes}
            onChange={handleChange}
            placeholder="e.g. 1050 sqft (Unit A & B)"
            className={inputCls}
          />
        </Field>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Field label="Bedrooms">
          <input
            type="number"
            min="0"
            name="bedrooms"
            value={formData.bedrooms}
            onChange={handleChange}
            className={inputCls}
          />
        </Field>
        <Field label="Bathrooms">
          <input
            type="number"
            min="0"
            name="bathrooms"
            value={formData.bathrooms}
            onChange={handleChange}
            className={inputCls}
          />
        </Field>
        <Field label="Flat Size">
          <input
            type="text"
            name="flatSize"
            value={formData.flatSize}
            onChange={handleChange}
            placeholder="e.g. 1050 sqft"
            className={inputCls}
          />
        </Field>
        <Field label="Orientation">
          <input
            type="text"
            name="orientation"
            value={formData.orientation}
            onChange={handleChange}
            placeholder="e.g. South Facing"
            className={inputCls}
          />
        </Field>
      </div>
    </div>
  </SectionCard>
);

export default ProjectDetailsSection;
