import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { urlGenres } from "../endpoints";
import Button from "../utils/Button";
import customConfirm from "../utils/customConfirm";
import DisplayErrors from "../utils/DisplayErrors";
import GenericList from "../utils/GenericList";
import Pagination from "../utils/Pagination";
import RecordsPerPageSelect from "../utils/RecordsPerPageSelect";
import { genreDTO } from "./Genres.model";

export default function IndexGenresOld() {
  const [genres, setGenres] = useState<genreDTO[]>();

  const [totalAmountOfPages, setTotalAmountOfPages] = useState(0);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [page, setPage] = useState(1);

  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    loadDate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, recordsPerPage]);

  function loadDate() {
    axios
      .get(urlGenres, { params: { page, recordsPerPage } })
      .then((response: AxiosResponse<genreDTO[]>) => {
        const totalAmountOfRecords = parseInt(
          response.headers["totalamountofrecords"],
          10
        );
        setTotalAmountOfPages(Math.ceil(totalAmountOfRecords / recordsPerPage));

        setGenres(response.data);
      });
  }

  async function deleteGenre(id: number) {
    try {
      await axios.delete(`${urlGenres}/${id}`);
      loadDate();
    } catch (error) {
      if (error && error.response) {
        setErrors(error.response.data);
      }
    }
  }

  return (
    <>
      <h3>Genres</h3>
      <Link className="btn btn-primary" to="/genres/create">
        Create Genre
      </Link>
      <DisplayErrors errors={errors} />
      <RecordsPerPageSelect
        onChange={(amountOfRecords) => {
          setPage(1);
          setRecordsPerPage(amountOfRecords);
        }}
      />
      <Pagination
        currentPage={page}
        totalAmountOfPages={totalAmountOfPages}
        onChange={(newPage) => setPage(newPage)}
      />
      <GenericList list={genres}>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {genres?.map((genre) => (
              <tr key={genre.id}>
                <td style={{ width: "80%" }}>{genre.name}</td>
                <td>
                  <Link
                    className="btn btn-success"
                    to={`/genres/edit/${genre.id}`}
                  >
                    Edit
                  </Link>
                  <Button
                    onClick={() => customConfirm(() => deleteGenre(genre.id))}
                    className="btn btn-danger"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </GenericList>
    </>
  );
}
