import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../ui/dialog';
import { Button } from '../ui/button';

const DialogCreater = ({
    trigger,
    title,
    description,
    submittext,
    handleSubmit,
    Component, // fixed spelling
}) => {
    const [open, setOpen] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        handleSubmit(data);
        setOpen(false); // close after submit
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">{trigger}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <form onSubmit={onSubmit}>
                    <Component open={open} />
                    <Button type="submit" className="mt-4">{submittext}</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default DialogCreater;
