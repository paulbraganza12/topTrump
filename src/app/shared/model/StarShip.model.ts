export class StarShip {
    public name: string;
    public cost_in_credits: string;
    public hyperdrive_rating: string;
    public max_atmosphering_speed: string;
    public films: string[];
    constructor(data) {
        this.name = data.name ? data.name : null;
        this.cost_in_credits = data.cost_in_credits ? data.cost_in_credits : null;
        this.hyperdrive_rating = data.hyperdrive_rating ? data.hyperdrive_rating : null;
        this.max_atmosphering_speed = data.max_atmosphering_speed ? data.max_atmosphering_speed : null;
        this.films = data.films ? data.films : null;

    }
}