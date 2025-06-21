// src/entity/FMRadio.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class FMRadio {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    stationName!: string; // Name of the radio station

    @Column()
    frequency!: string; // Frequency of the radio station (e.g., "101.5 FM")

    @Column()
    streamUrl!: string; // URL for streaming the radio station

    @Column({ nullable: true })
    description!: string; // Optional description of the radio station

    @Column({ type: 'date', nullable: true })
    dateAdded!: Date; // Date the station was added
}
// {
//     "stationName": "Classic Rock Radio",
//     "frequency": "101.5 FM",
//     "streamUrl": "http://streaming.example.com/classicrock",
//     "description": "Playing the best classic rock hits.",
//     "dateAdded": "2025-06-14"
//   }