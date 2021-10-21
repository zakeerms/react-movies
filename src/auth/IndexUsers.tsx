import axios from "axios";
import Swal from "sweetalert2";
import { urlAccounts } from "../endpoints";
import Button from "../utils/Button";
import customConfirm from "../utils/customConfirm";
import IndexEntity from "../utils/IndexEntity";
import { userDTO } from "./auth.models";

export default function IndexUsers(props: indexUsersProps) {
  async function makeAdmin(id: string) {
    doAdmin(`${urlAccounts}/makeAdmin`, id);
  }
  async function removeAdmin(id: string) {
    doAdmin(`${urlAccounts}/removeAdmin`, id);
  }
  async function doAdmin(url: string, id: string) {
    await axios.post(url, JSON.stringify(id), {
      headers: { "Content-Type": "application/json" },
    });
    Swal.fire({
      title: "Sucess",
      text: "Operation finished correctly",
      icon: "success",
    });
  }
  return (
    <IndexEntity<userDTO> title="Users" url={`${urlAccounts}/listUsers`}>
      {(users) => (
        <>
          <thead>
            <tr>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user.id}>
                <td>{user.email}</td>
                <td>
                  <Button
                    onClick={() =>
                      customConfirm(
                        () => makeAdmin(user.id),
                        `Do you wish to make ${user.email} an admin?`,
                        "Do it"
                      )
                    }
                  >
                    Make Admin
                  </Button>
                  <Button
                    className="btn btn-danger ms-2"
                    onClick={() =>
                      customConfirm(
                        () => removeAdmin(user.id),
                        `Do you wish to remove ${user.email} as an admin?`,
                        "Do it"
                      )
                    }
                  >
                    Remove Admin
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </>
      )}
    </IndexEntity>
  );
}

interface indexUsersProps {}
