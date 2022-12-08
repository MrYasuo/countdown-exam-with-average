import {
	Button,
	Image,
	InputNumber,
	Space,
	Statistic,
	TimePicker,
	Typography,
} from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
const { Countdown } = Statistic;

interface TempDeadlineProps {
	hours: number;
	minutes: number;
	seconds: number;
}

const App = () => {
	const [tempDeadline, setTempDeadline] = useState<TempDeadlineProps | null>(
		null
	);
	const [deadline, setDeadline] = useState<Dayjs | null>(null);
	const [number, setNumber] = useState<number>(0);
	const [remainingTime, setRemainingTime] = useState<number | null>(0);
	const [averageTime, setAverageTime] = useState<number | null>(0);
	const [start, setStart] = useState<boolean>(false);
	useEffect(() => {
		// @ts-ignore
		setAverageTime(remainingTime / number);
	}, [remainingTime]);
	return (
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
				padding: "20px",
			}}>
			<Space direction="vertical" style={{ paddingBottom: "10px" }}>
				<Space>
					<Typography.Title level={4} style={{ margin: 0 }}>
						Remaining time:
					</Typography.Title>
					<Countdown
						// @ts-ignore
						value={deadline}
						key={deadline?.valueOf()}
						// @ts-ignore
						onChange={(value) => setRemainingTime(value)}
					/>
				</Space>
				<Space>
					<Typography.Title level={4} style={{ margin: 0 }}>
						Average time/question:
					</Typography.Title>
					<Countdown
						// @ts-ignore
						value={
							dayjs().add(averageTime!, "ms").isValid()
								? dayjs().add(averageTime!, "ms")
								: null
						}
						// @ts-ignore
						key={dayjs().add(averageTime, "ms")}
						format="HH:mm:ss:SSS"
					/>
				</Space>
				<Space>
					<TimePicker
						placeholder="Enter new time"
						showNow={false}
						onChange={(time) => {
							setTempDeadline({
								hours: time!.hour(),
								minutes: time!.minute(),
								seconds: time!.second(),
							});
						}}
						disabled={start}
					/>
					<InputNumber
						min={0}
						max={100}
						value={number}
						onChange={(value) => setNumber(value!)}
						controls={{
							upIcon: (
								<Button type="text" style={{ zIndex: 9999 }}>
									+
								</Button>
							),
							downIcon: (
								<Button type="text" style={{ zIndex: 9999 }}>
									-
								</Button>
							),
						}}
						disabled={start}
					/>
					{start ? (
						<Button
							type="primary"
							onClick={() => {
								setStart(false);
								setDeadline(null);
								setAverageTime(null);
								setRemainingTime(null);
							}}
							danger>
							Stop
						</Button>
					) : (
						<Button
							type="primary"
							onClick={() => {
								setStart(true);
								setDeadline(
									dayjs()
										.add(tempDeadline!.hours!, "hour")
										.add(tempDeadline!.minutes!, "minute")
										.add(tempDeadline!.seconds!, "second")
								);
							}}>
							Start
						</Button>
					)}
				</Space>
			</Space>
			<Button
				style={{ width: "100%", height: "100%" }}
				onClick={() =>
					setNumber((prev) => {
						if (!prev) return 0;
						return prev - 1;
					})
				}>
				<Space direction="vertical">
					<Image src="/cpu.jpg" preview={false} />
					<Typography.Text>Tap here to finish one question</Typography.Text>
				</Space>
			</Button>
		</div>
	);
};

export default App;
