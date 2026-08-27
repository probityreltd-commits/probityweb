import PropertyManagerClient from "@/components/admin/propertyManage/PropertyManager";
import { getPropertys } from "@/services/api/property";

import React from "react";

const PropertyPage = async () => {
  const data = await getPropertys();
  const properties = data?.data || [];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <PropertyManagerClient initialProperties={properties} />
    </div>
  );
};

export default PropertyPage;
