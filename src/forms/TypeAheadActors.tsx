import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { ReactElement } from "react-markdown/lib/react-markdown";
import { actorMovieDTO } from "../actors/actord.model";
import { urlActors } from "../endpoints";

export default function TypeAheadActors(props: TypeAheadActorsProps) {
  const [actors, setActors] = useState<actorMovieDTO[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const selected: actorMovieDTO[] = [];

  const [draggaedElement, setDraggedElement] = useState<
    actorMovieDTO | undefined
  >(undefined);

  function handleSearch(query: string) {
    setIsLoading(true);
    axios
      .get(`${urlActors}/searchByName/${query}`)
      .then((response: AxiosResponse<actorMovieDTO[]>) => {
        setActors(response.data);
        setIsLoading(false);
      });
  }

  function handleDragStart(actor: actorMovieDTO) {
    setDraggedElement(actor);
  }
  function handleDragOver(actor: actorMovieDTO) {
    if (!draggaedElement) {
      return;
    }
    if (actor.id !== draggaedElement.id) {
      const dragElementIndex = props.actors.findIndex(
        (x) => x.id === draggaedElement.id
      );
      const actortIndex = props.actors.findIndex((x) => x.id === actor.id);

      const actors = [...props.actors];
      actors[actortIndex] = draggaedElement;
      actors[dragElementIndex] = actor;
      props.onAdd(actors);
    }
  }
  return (
    <div className="mb-3">
      <label>{props.labelText}</label>
      <AsyncTypeahead
        id="typeahead"
        onChange={(actors) => {
          if (props.actors.findIndex((x) => x.id === actors[0].id) === -1) {
            actors[0].character = "";
            props.onAdd([...props.actors, actors[0]]);
          }
        }}
        options={actors}
        labelKey={(actor) => actor.name}
        filterBy={() => true}
        isLoading={isLoading}
        onSearch={handleSearch}
        placeholder="Write the name of the actor"
        minLength={1}
        flip={true}
        selected={selected}
        renderMenuItemChildren={(actor) => (
          <>
            <img
              alt="actor"
              src={actor.picture}
              style={{
                height: "64px",
                marginRight: "10px",
                width: "64px",
              }}
            />
            <span>{actor.name}</span>
          </>
        )}
      />
      <ul className="list-group">
        {props.actors.map((actor) => (
          <li
            key={actor.id}
            draggable={true}
            onDragStart={() => handleDragStart(actor)}
            onDragOver={() => handleDragOver(actor)}
            className="list-group-item list-group-item-action"
          >
            {props.listUI(actor)}
            <span
              className="badge badge-primary badge-pill pointer text-dark"
              style={{ marginLeft: "0.5rem" }}
              onClick={() => props.onRemove(actor)}
            >
              X
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface TypeAheadActorsProps {
  labelText: string;
  actors: actorMovieDTO[];
  onAdd(actors: actorMovieDTO[]): void;
  onRemove(actors: actorMovieDTO): void;
  listUI(acttors: actorMovieDTO): ReactElement;
}
