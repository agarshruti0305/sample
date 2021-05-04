import { StatusPipe } from "../pipes/status.pipe";

export class Task {
    id: string;
    taskName: string;
    taskDate: Date;
    selected: boolean;
    taskStatus: number;
}