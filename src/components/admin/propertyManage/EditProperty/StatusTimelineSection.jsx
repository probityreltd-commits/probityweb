import SectionCard from "./SectionCard";

const inputCls =
  "w-full px-3.5 py-2.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3b1a83]/30";

const StatusTimelineSection = ({ formData, handleChange }) => (
  <SectionCard
    number={3}
    title="Project Status & Timeline"
    description="Set construction progress stage and handover commitments"
  >
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label className="block text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
          Construction Status
        </label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className={`${inputCls} font-bold`}
        >
          <option value="UNDER CONSTRUCTION">UNDER CONSTRUCTION</option>
          <option value="READY TO MOVE">READY TO MOVE</option>
          <option value="UPCOMING">UPCOMING</option>
        </select>
      </div>

      <div>
        <label className="block text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
          Handover Date
        </label>
        <input
          type="date"
          name="handoverDate"
          value={formData.handoverDate}
          onChange={handleChange}
          className={inputCls}
        />
      </div>
    </div>
  </SectionCard>
);

export default StatusTimelineSection;
