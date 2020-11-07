import React from 'react'
import Card, { CardBody, CardFooter, CardHeader } from '../../../components/Card'

export default function CardComponent(): JSX.Element {
	return (
		<div>
			<Card>
				<CardHeader>
					<span>暗いお城</span>
				</CardHeader>
				<CardBody>
					<p>暗いお城で開かれた</p>
					<p>一人きりで始まるお茶会</p>
					<p>籠の中の小鳥さん</p>
					<p>あなた、私と踊りましょ？</p>
					<p>休む事も無く　手を叩く</p >
					<p>終わる事の無い　秘密のカルニバル</p>
				</CardBody>
				<CardFooter>
					<span>Who Killed U.N.Owen</span>
				</CardFooter>
			</Card>
		</div>
	)
}
