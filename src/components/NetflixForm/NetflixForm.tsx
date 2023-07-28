

import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from '@mui/material';

import { Input } from "../sharedComponents";
import { serverCalls } from "../../api";
import { NetflixState } from "../../redux/slices/rootSlice";

interface NetflixFormProps {
    id?: string;
    data?: NetflixState;
}

export const NetflixForm = (props: NetflixFormProps) => {
    const { register, handleSubmit } = useForm<NetflixState>();

    const onSubmit: SubmitHandler<NetflixState> = async (data, event) => {
        if (event) event?.preventDefault();

        if (props.id) {
            console.log(props.id);
            await serverCalls.update(props.id, data);
            console.log(`Update Show: ${data.title}`);
            window.location.reload();
            if (event) event.currentTarget.reset();
        } else {
            try {
                await serverCalls.create(data);
                console.log(`Create Show: ${data.title}`);
                window.location.reload();
                if (event) event.currentTarget.reset();
            } catch (error) {
                console.error("Error creating the show:", error);
            }
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor='title'>Title1</label>
                    <Input {...register('title')} name='title' placeholder='Title Here' />
                </div>
                <div>
                    <label htmlFor='title_type'>Title Type</label>
                    <Input {...register('title_type')} name='title_type' placeholder='Title Type Here' />
                </div>
                <div>
                    <label htmlFor='synopsis'>Synopsis</label>
                    <Input {...register('synopsis')} name='synopsis' placeholder='Synopsis Here' />
                </div>
                <div>
                    <label htmlFor='rating'>Rating</label>
                    <Input {...register('rating')} name='rating' placeholder='Rating Here' />
                </div>
                <div>
                    <label htmlFor='year'>Year </label>
                    <Input {...register('year')} name='year' placeholder='Year Here' />
                </div>
                <div>
                    <label htmlFor='runtime'>Runtime</label>
                    <Input {...register('runtime')} name='runtime' placeholder='Runtime Here' />
                </div>

                <Button type='submit'>Submit</Button>
            </form>
        </div>
    );
}