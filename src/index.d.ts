export type ConnectionState = "asleep" | "alive" | "dead"
export type ConnectionType = "connect" | "once" | "wait" | "nul"

interface RolertConnection {
	GetState(): ConnectionState

	Disconnect(): void
	Sleep(): void
	Wake(): void
}

type params<T> = Parameters<
	T extends unknown[]
		? (...args: T) => void
		: T extends unknown
		? (args: T) => void
		: () => void
>

type callback<T> = (...args: params<T>) => void

interface RolertSignal<T extends unknown[] | unknown = void> {
	name: string
	middlewares: ((...args: any[]) => boolean)[]

	Fire(...args: params<T>): void
	Once(args: T, name?: string): RolertConnection

	Attach(toThisSignal: RolertSignal<any>, callback: callback<T>): void
	Detach(fromThisSignal: RolertSignal<any>): void

	Connect(callback: callback<T>, name?: string): RolertConnection
	Wait(
		yield: boolean,
		onSuccess: callback<T>,
		duration: number,
		onFail?: callback<T>,
		name?: string
	): RolertConnection
	Wait(yield: boolean, callback: callback<T>, name?: string): RolertConnection

	CreateBindToRBXSignal: <K extends []>(
		rbxScriptSignal: RBXScriptSignal<callback<K>>,
		callback: callback<K>,
		persist?: boolean,
		name?: string
	) => {
		unbind: () => void
		sleep: () => void
		wake: () => void
	}

	FinalBreath(): void
	Cleanup(): void
}

interface RolertSignalConstructor {
	new <T extends unknown[]>(name?: string): RolertSignal<T>
	// totalConnections: Record<number, RolertConnection | RBXScriptConnection>
	// totalSignals: Record<number, RolertSignal>
}

declare const RolertSignal: RolertSignalConstructor
export default RolertSignal
