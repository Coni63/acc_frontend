export interface Rating {
    datetime: Date,
    total: number,
    TR: number,
    CN: number,
    CC: number,
    PC: number,
    SA: number,
    RC: number,
    CP: number,
}

export interface Histogram {
    x : string[],
    y : number[],
}

export interface HistAPI {
    total: object,
    TR: object,
    CN: object,
    CC: object,
    PC: object,
    SA: object,
    RC: object,
    CP: object,
}

export interface Histograms {
    total: Histogram,
    TR: Histogram,
    CN: Histogram,
    CC: Histogram,
    PC: Histogram,
    SA: Histogram,
    RC: Histogram,
    CP: Histogram,
}