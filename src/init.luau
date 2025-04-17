local __i = 0
type RolertConnection = {
	GetState: () -> "asleep" | "alive" | "dead",

	Disconnect: (self: RolertConnection) -> nil,
	Sleep: (self: RolertConnection) -> nil,
	Wake: (self: RolertConnection) -> nil,
}
--todo add listen only signal that returns a Firer

function RolertConnectionCtr(callback: (s: any) -> nil, disconnect: () -> nil): RolertConnection
	__i = __i + 1
	local State = "alive"
	return {
		id = __i,
		__index = function()
			return warn(" connection is private ")
		end,
		__call = function(_, ...)
			callback(...)
		end,
		Wake = function() --wish there was a way to one-line all of there
			if State == "dead" then
				return warn("connection is dead")
			end
			State = "alive"
			return
		end,
		Sleep = function()
			if State == "dead" then
				return warn("connection is dead")
			end
			State = "asleep"
			return
		end,
		Disconnect = function()
			State = "dead"
			disconnect()
		end,
		GetState = function()
			return State
		end,
	}
end

type node = {
	value: RolertConnection?,
	_next: node?,
	_prev: node?,
}

local stack: node = {
	value = nil,
}
local RolertSignal = {
	_stack = nil,
}
RolertSignal.__index = RolertSignal

function RolertSignal:Fire(...)
	if not self._stack then
		return
	end

	print(self._stack)
	local curr = self._stack
	while curr do
		curr.value.__call()
		curr = curr._next
	end
end

function RolertSignal:Connect(cb: () -> nil)
	print(self._stack)
	local c: node = {}
	if self._stack then
		self._stack._prev = c
		c._next = self._stack
		self._stack = c
	else
		self._stack = c
	end

	c.value = RolertConnectionCtr(cb, function()
		if c._prev then
			c._prev._next = c._next
		elseif c._next then
			self._stack = c._next
			self._stack._prev = nil
		else
			self._stack = nil
		end
		print(self._stack)
	end)

	self._stack = c

	return c.value
end

function RolertSignal.new()
	return setmetatable({}, RolertSignal)
end

return setmetatable(RolertSignal, {
	__newindex = function()
		warn("Nuh uh 🙂‍↔️")
	end,
	__index = function() end,
})
