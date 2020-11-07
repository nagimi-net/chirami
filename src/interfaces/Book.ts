export enum BookStatus {
	UNDEFINED = -1,
	COMPLETE = 0,
	ONGOING = 1,
	HIATUS = 3,
	CANCELLED = 5,
	DISCONTINUED = 9,
}

export interface Book {
	index: string;
	title: string;
	title_alt: string[];
	cover: string;
	author: string[];
	genre: string[];
	type: string;
	status: BookStatus;
	relased: string;
	description: string;
	chapters: BookChapter[];
}

export type BookCover = Omit<Book, 'chapters'>

export interface BookChapter {
	index: string;
	label: string;
	date: string;
	season: string;
}

export interface BookPage {
	index: string;
	label: string;
	url: string;
}
