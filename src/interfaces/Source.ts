import { Book, BookChapter, BookPage } from './Book';

export enum RestrictionType {
	DEV			= 'dev',
	NORMAL		= 'normal',
	EXPLICIT	= 'explicit',
}

export interface SourceOptions {
	/** id of source manager */
	id: string;

	/** url source */
	url: string;

	/** icon source */
	logo: string;

	/** restriction */
	label: RestrictionType[];

	/** add description for this source */
	description?: string;

	/** backdrop color, for design purpose */
	backdrop_color?: string;
}

export interface Pamflet extends BookChapter {
	book: BookCover;
}
export interface BookCover {

}

type Window = {
	source: {
		LIST: SourceOptions[],
		log: string[]
	};
}

export class SourceManager {
	public static LIST = (window as unknown as Window).source.LIST;
	public static LOG = (window as unknown as Window).source.log;

	public static getUpdates(sourceIndex: string): Promise<Pamflet[]> {
		return (window as any).source.api.getUpdates(sourceIndex);
	}
	public static directory(sourceIndex: string): Promise<BookCover[]> {
		return (window as any).source.api.getDirectory(sourceIndex);
	}
	public static getBook(sourceIndex: string, bookIndex: string): Promise<Book> {
		return (window as any).source.api.getBook(sourceIndex, bookIndex);
	}
	public static getChapter(sourceIndex: string, bookIndex: string, chapterIndex: string): Promise<BookPage[]> {
		return (window as any).source.api.getChapter(sourceIndex, bookIndex, chapterIndex);
	}
}
