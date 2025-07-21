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
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			backgroundImage: {
				'gradient-primary': 'var(--gradient-primary)',
				'gradient-card': 'var(--gradient-card)',
				'gradient-glow': 'var(--gradient-glow)'
			},
			boxShadow: {
				'glow': 'var(--shadow-glow)',
				'card': 'var(--shadow-card)',
				'button': 'var(--shadow-button)',
				'3d': 'var(--shadow-3d)',
				'float': 'var(--shadow-float)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'glow-pulse': {
					'0%, 100%': { 
						boxShadow: '0 0 20px hsl(45 100% 55% / 0.4)',
						transform: 'scale(1)'
					},
					'50%': { 
						boxShadow: '0 0 40px hsl(45 100% 55% / 0.8)',
						transform: 'scale(1.05)'
					}
				},
				'float': {
					'0%, 100%': { 
						transform: 'translateY(0px) rotateZ(0deg)',
						boxShadow: '0 10px 20px hsl(220 15% 4% / 0.4)'
					},
					'50%': { 
						transform: 'translateY(-10px) rotateZ(2deg)',
						boxShadow: '0 20px 40px hsl(220 15% 4% / 0.6)'
					}
				},
				'card-hover': {
					'0%': { 
						transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
						boxShadow: '0 8px 32px hsl(220 15% 4% / 0.5)'
					},
					'100%': { 
						transform: 'perspective(1000px) rotateX(5deg) rotateY(5deg) translateZ(20px)',
						boxShadow: '0 20px 40px hsl(220 15% 4% / 0.6), 0 8px 16px hsl(45 100% 55% / 0.2)'
					}
				},
				'slide-in-up': {
					'0%': { 
						transform: 'translateY(100px) rotateX(-10deg)',
						opacity: '0'
					},
					'100%': { 
						transform: 'translateY(0px) rotateX(0deg)',
						opacity: '1'
					}
				},
				'scale-bounce': {
					'0%': { transform: 'scale(0.8) rotateZ(-5deg)', opacity: '0' },
					'50%': { transform: 'scale(1.1) rotateZ(2deg)', opacity: '0.8' },
					'100%': { transform: 'scale(1) rotateZ(0deg)', opacity: '1' }
				},
				'rotate-3d': {
					'0%': { transform: 'perspective(1000px) rotateY(0deg)' },
					'100%': { transform: 'perspective(1000px) rotateY(360deg)' }
				},
				'neon-glow': {
					'0%, 100%': { 
						filter: 'brightness(1) drop-shadow(0 0 10px hsl(45 100% 55% / 0.4))'
					},
					'50%': { 
						filter: 'brightness(1.2) drop-shadow(0 0 20px hsl(45 100% 55% / 0.8))'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
				'float': 'float 3s ease-in-out infinite',
				'card-hover': 'card-hover 0.3s ease-out',
				'slide-in-up': 'slide-in-up 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
				'scale-bounce': 'scale-bounce 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
				'rotate-3d': 'rotate-3d 4s linear infinite',
				'neon-glow': 'neon-glow 2s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
