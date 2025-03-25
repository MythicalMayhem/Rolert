export type ConnectionState = "asleep" | "alive" | "dead"

local connection = {
	State = "alive",
}

function connection:Wake()
	if self.State == "dead" then
		return warn("connection is dead")
	end
	self.State = "alive"
	return
end

function connection:Sleep()
	if self.State == "dead" then
		return warn("connection is dead")
	end

	self.State = "asleep"
	return
end

function connection:Disconnect()
	self.State = "dead"
	return
end

function connection:GetState()
	return self.State
end

local i = 0
return function(callback: (s: any) -> nil)
	i = i + 1

	local id = i
	connection.id = id
	return setmetatable({
		__index = function()
			--return warn(" connection is private ")
			return id
		end,
		__call = function(_, ...)
			callback(...)
		end,
	}, connection) :: any
end
