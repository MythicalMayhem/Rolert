--[[
this script is not published in the npm package
]]



local rolert = require(script.Parent)

local signal = rolert.new()

local conn0 = signal:Connect(function()
	print("conn0")
end)

local conn1 = signal:Connect(function()
	print("conn1")
end)

local conn2 = signal:Connect(function()
	print("conn2")
end)
local conn3 = signal:Connect(function()
	print("conn3")
end)

task.spawn(function()
	task.wait(2)
	conn1:Disconnect()
	task.wait(1)
	conn2:Disconnect()
	task.wait(1)
	conn3:Disconnect()
	task.wait(1)
	conn0:Disconnect()
	task.wait(1)
	conn2 = signal:Connect(function()
		print("conn2")
	end)
	conn0 = signal:Connect(function()
		print("conn0")
	end)
end)

while task.wait(0.2) do
	print("+++++++")
	signal:Fire()
end
