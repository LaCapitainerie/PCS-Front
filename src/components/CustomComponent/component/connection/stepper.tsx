import * as React from "react";

import {
	Step,
	type StepItem,
	Stepper,
	type StepperProps,
	useStepper,
} from "@/components/ui/stepper/";
import { Button } from "@/components/ui/button";
// import sendOTP from "./otp";


export default function StepperComp({children, steps}: {children: React.ReactNode[], steps: StepItem[]}) {

	return (
		<div className="flex w-full h-full flex-col justify-between gap-4">
			<Stepper variant={"line"} initialStep={0} steps={steps}>
				{steps.map((stepProps, index) => {
					return (
						<Step key={stepProps.label} {...stepProps}>
							<div className="flex items-center justify-center my-2 text-primary">
								{children[index] || "Aucun Contenu"}
							</div>
						</Step>
					);
				})}
				<Footer />
			</Stepper>
		</div>
	);
}

const Footer = () => {
	const {
		nextStep,
		prevStep,
		resetSteps,
		isDisabledStep,
		hasCompletedAllSteps,
		isLastStep,
		isOptionalStep,
	} = useStepper();
	return (
		<>
			{hasCompletedAllSteps && (
				<div className="h-40 flex items-center justify-center my-2 border bg-secondary text-primary rounded-md">
					<h1 className="text-xl">Création du compte terminée !</h1>
				</div>
			)}
			<div className="w-full flex justify-end gap-2">
				{hasCompletedAllSteps ? (
					<Button size="sm" onClick={resetSteps}>
						Recommencer
					</Button>
				) : (
					<>
						<Button
							disabled={isDisabledStep}
							onClick={prevStep}
							size="sm"
							variant="secondary"
						>
							Retour
						</Button>
						<Button size="sm" onClick={nextStep}>
							{isLastStep ? "Terminer" : isOptionalStep ? "Passer" : "Suivant"}
						</Button>
					</>
				)}
			</div>
		</>
	);
};