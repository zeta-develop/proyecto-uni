import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { FcGoogle } from "react-icons/fc"
import { signIn } from "@/auth"

export default function LoginPage() {

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Bienvenido a ProActiva</CardTitle>
        <CardDescription>Inicia sesión para acceder a tu cuenta</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          action={async () => {
            "use server"
            await signIn("google")
          }}
        >
          <Button type="submit" variant="outline" className="w-full py-6 text-base font-semibold">
            <FcGoogle className="mr-2 h-5 w-5" />
            Continuar con Google
          </Button>
        </form>

        <Separator className="my-6" />
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="tu@email.com"
                type="email"
                required
              />
            </div>
          </div>
          <Button className="w-full mt-4" type="submit">
            Enviar Magic Link
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">¿No tienes una cuenta? Contacta a tu administrador</p>
      </CardFooter>
    </Card>
  )
}
