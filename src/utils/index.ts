export enum OPERATIONS {
    ADDITION = "addition",
    SUBTRACTION = "subtraction",
    DIVISION = "division",
    MULTIPLICATION = "multiplication", 
    SQUAREROOT = "square_root",
    RANDOMSTRING = "random_string"
}

export interface RecordsResponse {
    id: string,
    amount: string,
    operationType: string,
    operationResponse: string,
    date: string
}
