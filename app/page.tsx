import { Button } from '@/app/components/inputs/Button';

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center items-center bg-primary">
            <div className="w-[340px] h-[200px] flex flex-col items-center bg-white rounded-md relative">
                <div className="border border-primary-dark bg-white z-10 w-full h-full rounded-lg absolute flex flex-col py-4 pb-7 px-6 justify-between">
                    <h1 className="text-4xl text-primary-dark font-medium">
                        Portfolio Management
                    </h1>
                    <Button
                        href="/api/auth/login?returnTo=/dashboard"
                        color="primary-dark"
                        fullWidth
                    >
                        Login
                    </Button>
                </div>

                <div className="w-full h-full rounded-md absolute -right-[8px] top-[8px] bg-primary-dark z-0" />
            </div>
        </main>
    );
}
