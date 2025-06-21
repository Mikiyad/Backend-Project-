import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './UserEntity';

@Entity('reset_tokens')
export class ResetToken {
    @PrimaryColumn()
    token!: string;

    @ManyToOne(() => User, (user) => user._id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id'})
    user!: User;

    @Column({ name: 'user_id' })
    userId!: number;

    @Column({ name: 'token_expiry' })
    tokenExpiry!: number;
   

}