import Papa from 'papaparse';

interface ParseSoldAnimalsProps {
    file: File;
}

function removeLettersAndLeftZeroFromRing(value: any) {
    const ring = value.split('');

    while (ring[0] === '0' || isNaN(ring[0])) {
        ring.shift();
    }
    return ring.join('');
}

export function ParseSoldAnimalsUseCase() {
    return {
        execute: async ({ file }: ParseSoldAnimalsProps) => {
            // Passing file data (event.target.files[0]) to parse using Papa.parse
            const promise = new Promise((resolve) => {
                const results = Papa.parse(file, {
                    worker: true,
                    header: false,
                    skipEmptyLines: true,
                    complete: function (results) {
                        resolve(results.data);
                    },
                });
            });
            const result = (await promise) as any[];

            const animals = result.map((item) => {
                const ring = removeLettersAndLeftZeroFromRing(item[1]);

                return {
                    ring,
                };
            });
            return animals;
        },
    };
}
