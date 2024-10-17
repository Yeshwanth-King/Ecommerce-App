import React, { useSession } from "react";

const page = () => {
  const { data: session, status } = useSession();

  return (
    <div>
      <h1>Welcome {data?.name} </h1>
    </div>
  );
};

export default page;
