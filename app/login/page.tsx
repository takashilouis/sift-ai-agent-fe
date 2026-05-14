import Link from "next/link";

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="bg-surface-container-lowest rounded-2xl shadow-lg p-10 w-full max-w-md space-y-8">
                <div className="flex flex-col items-center gap-2">
                    <div className="w-14 h-14 rounded-full bg-primary-container flex items-center justify-center">
                        <span className="material-symbols-outlined text-on-primary-container text-3xl">auto_awesome</span>
                    </div>
                    <h1 className="font-headline text-2xl font-bold text-primary">Welcome back</h1>
                </div>
                <form className="space-y-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-on-surface">Email</label>
                        <input type="email" className="bg-surface-container border border-outline-variant/20 rounded-lg px-4 py-3 text-sm" placeholder="you@email.com" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-on-surface">Password</label>
                        <input type="password" className="bg-surface-container border border-outline-variant/20 rounded-lg px-4 py-3 text-sm" placeholder="••••••••" />
                    </div>
                    <div className="flex justify-between items-center">
                        <Link href="#" className="text-xs text-primary hover:underline">Forgot password?</Link>
                    </div>
                    <button type="submit" className="btn-primary-gradient w-full py-3 rounded-lg font-bold text-base">Sign In</button>
                    <div className="flex items-center gap-2 my-2">
                        <div className="flex-1 h-px bg-outline-variant/20" />
                        <span className="text-xs text-tertiary">or</span>
                        <div className="flex-1 h-px bg-outline-variant/20" />
                    </div>
                    <button type="button" className="w-full py-3 rounded-lg border border-outline-variant/20 flex items-center justify-center gap-2 font-bold text-sm bg-white hover:bg-surface-container transition-colors">
                        <span className="material-symbols-outlined text-lg">account_circle</span>
                        Continue with Google
                    </button>
                </form>
                <div className="text-center text-sm text-tertiary mt-4">
                    Don&apos;t have an account? <Link href="/signup" className="text-primary font-bold hover:underline">Sign Up</Link>
                </div>
            </div>
        </div>
    );
}
