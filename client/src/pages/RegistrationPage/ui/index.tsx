import React from 'react'
import styles from './RegistrationPage.module.scss'

export default function RegistrationPage() {
	return (
		<div className={styles.container}>
			<div className={styles.block}>
				<div className={styles.blockForm}>
					<h1></h1>
					<form action='' className={styles.formRegister}>
						<div className={styles.formFields}>
							<div className={styles.formField}>
								<label htmlFor='' className={styles.formFieldLabel}>Email</label>
								<input
									type='text'
									name=''
									id=''
									className={styles.formFieldInput}
								/>
							</div>
							<div className={styles.formField}>
								<label htmlFor='' className={styles.formFieldLabel}>Пароль</label>
								<input
									type='text'
									name=''
									id=''
									className={styles.formFieldInput}
								/>
							</div>
							<div className={styles.formButton}>
								<button></button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
