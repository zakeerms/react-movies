export interface actorCreationDTO {
  name: string;
  dateOfBirth?: Date;
  picture?: File;
  pictureURL?: string;
  biography?: string;
}
export interface actorMovieDTO {
  id: number;
  name: string;
  character: string;
  picture: string;
}

export interface actorDTO {
  id: number;
  name: string;
  character: string;
  picture: string;
  biography: string;
  dateOfBirth: Date;
}
