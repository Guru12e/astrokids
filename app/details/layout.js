import Header from "@/components/Header";
import React, { Suspense } from "react";

const DetailsLayout = ({ children }) => {
  return (
    <div>
      <Header nav={false} />
      <Suspense>{children}</Suspense>
    </div>
  );
};

export default DetailsLayout;
