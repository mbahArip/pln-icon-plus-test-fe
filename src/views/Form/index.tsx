import { buttonVariants } from "@/components/Button";
import Heading from "@/components/form/Heading";
import { Icon } from "@/components/Icon";
import { Link } from "react-router";

export default function ViewForm() {
  return (
    <>
      <Heading
        title="Ruang Meeting"
        paths={[{ name: "Ruang Meeting", href: "/form" }]}
        action={
          <Link to="/form/add" className={buttonVariants()}>
            <Icon name="Plus" />
            Pesan Ruangan
          </Link>
        }
      />
    </>
  );
}
