export type ThemeTypes = 'auto' | 'light' | 'dark';

export interface Settings {
    theme: ThemeTypes,
    countdown: number,
    sound: boolean,
    language: string,
}
