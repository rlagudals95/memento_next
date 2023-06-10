import { Meta } from "@/layouts/Meta";
import { Main } from "@/templates/Main";
import InitPage from "./InitPage"

const Index = () => {
  return (
    <Main
      meta={
        <Meta
          title="mementomori"
          description="mementomori"
        />
      }
    > 
      {/* TODO 기존 사용자는 Setting Page로 이동  */}
      <InitPage />
    </Main>
  );
};

export default Index;
