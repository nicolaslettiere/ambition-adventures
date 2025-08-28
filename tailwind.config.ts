import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					glow: 'hsl(var(--primary-glow))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				experience: {
					DEFAULT: 'hsl(var(--experience))',
					bg: 'hsl(var(--experience-bg))'
				},
				level: {
					bronze: 'hsl(var(--level-bronze))',
					silver: 'hsl(var(--level-silver))',
					gold: 'hsl(var(--level-gold))',
					platinum: 'hsl(var(--level-platinum))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			backgroundImage: {
				'gradient-primary': 'var(--gradient-primary)',
				'gradient-secondary': 'var(--gradient-secondary)',
				'gradient-experience': 'var(--gradient-experience)',
				'gradient-magical': 'var(--gradient-magical)',
				'gradient-royal': 'var(--gradient-royal)'
			},
			boxShadow: {
				'mystical': 'var(--shadow-mystical)',
				'glow': 'var(--shadow-glow)',
				'level-up': 'var(--shadow-level-up)'
			},
			transitionTimingFunction: {
				'magical': 'var(--transition-magical)',
				'smooth': 'var(--transition-smooth)'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'levelUpGlow': {
					'0%': {
						transform: 'scale(1)',
						boxShadow: 'var(--shadow-mystical)'
					},
					'50%': {
						transform: 'scale(1.05)',
						boxShadow: 'var(--shadow-level-up)'
					},
					'100%': {
						transform: 'scale(1)',
						boxShadow: 'var(--shadow-mystical)'
					}
				},
				'taskCompleted': {
					'0%': {
						transform: 'scale(1)',
						opacity: '1'
					},
					'50%': {
						transform: 'scale(1.1)',
						opacity: '0.8'
					},
					'100%': {
						transform: 'scale(1)',
						opacity: '1'
					}
				},
				'experienceFlow': {
					'0%': {
						transform: 'translateX(-100%)'
					},
					'100%': {
						transform: 'translateX(0%)'
					}
				},
				'sparkle': {
					'0%, 100%': {
						opacity: '0',
						transform: 'rotate(0deg) scale(0)'
					},
					'50%': {
						opacity: '1',
						transform: 'rotate(180deg) scale(1)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'level-up-glow': 'levelUpGlow 2s ease-out',
				'task-completed': 'taskCompleted 0.6s ease-out',
				'experience-flow': 'experienceFlow 1s ease-out',
				'sparkle': 'sparkle 1.5s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
