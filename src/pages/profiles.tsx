import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  console.log(session);
  if (!session) {
    return {
      redirect: {
        destination: "/auth/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

const Profiles = () => {
  return (
    <div>
      <h1>Profiles</h1>
    </div>
  );
};

export default Profiles;
