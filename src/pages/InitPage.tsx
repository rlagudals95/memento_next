import { useRouter } from "next/router";

const InitPage = () => {
  const router = useRouter();

  const goMainPage = () => {
    router.replace("/MainPage");
  };

  return (
    <div
      onClick={goMainPage}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    >
    </div>
  );
};

export default InitPage;
