import Papa from 'papaparse';

interface ParseBoughtAnimalsProps {
    file: File;
}

export function ParseBoughtAnimals() {
    return {
        execute: async ({ file }: ParseBoughtAnimalsProps) => {
            // Passing file data (event.target.files[0]) to parse using Papa.parse
            const promise = new Promise((resolve) => {
                Papa.parse(file, {
                    worker: true,
                    header: false,
                    skipEmptyLines: true,
                    complete: function (results) {
                        resolve(results.data);
                    },
                });
            });
            const result = (await promise) as any[];
            const animals = result.map((item, index) => {
                return {
                    age: item[2],
                    ring: item[0],
                    gender: item[1],
                };
            });

            return animals;
        },
    };
}
