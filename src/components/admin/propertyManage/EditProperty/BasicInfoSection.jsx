import SectionCard from "./SectionCard";

const Field = ({ label, required, children }) => (
  <div>
    <label className="block text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
      {label} {required && <span className="text-rose-500">*</span>}
    </label>
    {children}
  </div>
);

const inputCls =
  "w-full px-3.5 py-2.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#3b1a83]/30 transition-all";

const BasicInfoSection = ({
  formData,
  handleChange,
  handleTitleChange,
  handleSlugChange,
}) => (
  <SectionCard
    number={1}
    title="Basic Information"
    description="Provide key identification and location parameters"
  >
    <div className="space-y-4">
      <Field label="Project Title" required>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleTitleChange}
          placeholder="e.g. Bashundhara Green Tower"
          className={inputCls}
        />
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="URL Slug">
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleSlugChange}
            className={inputCls}
          />
          <p className="text-[10px] text-zinc-400 mt-1">
            Permalink:{" "}
            <span className="text-zinc-500">/property/your-slug</span>
          </p>
        </Field>

        <Field label="Location Name">
          <input
            type="text"
            name="locationName"
            value={formData.locationName}
            onChange={handleChange}
            placeholder="e.g. Uttara, Dhaka"
            className={inputCls}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Property Type / Category" required>
          <select
            name="propertyType"
            value={formData.propertyType}
            onChange={handleChange}
            className={inputCls}
          >
            <option value="">Select Property Type</option>
            <option value="Residential Apartment">Residential Apartment</option>
            <option value="Commercial Space">Commercial Space</option>
            <option value="Luxury Villa">Luxury Villa</option>
            <option value="Duplex Studio">Duplex Studio</option>
          </select>
        </Field>

        <Field label="Price Per Sqft">
          <input
            type="text"
            name="pricePerSqft"
            value={formData.pricePerSqft}
            onChange={handleChange}
            placeholder="e.g. 2,850 - 3,000 BDT"
            className={inputCls}
          />
        </Field>
      </div>

      <Field label="Project Location / Full Address">
        <textarea
          name="address"
          rows={2}
          value={formData.address}
          onChange={handleChange}
          placeholder="e.g. Plot 45, Road 12, Sector 6, Uttara Model Town, Dhaka"
          className={inputCls}
        />
      </Field>

      <Field label="Detailed Description">
        <textarea
          name="description"
          rows={4}
          value={formData.description}
          onChange={handleChange}
          placeholder="Provide a compelling description showcasing architectural highlights, surroundings, accessibility, and luxury features..."
          className={inputCls}
        />
      </Field>
    </div>
  </SectionCard>
);

export default BasicInfoSection;
