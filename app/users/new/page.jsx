"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const NewUsersPage = () => {
  const handleAddNewUser = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const newUser = Object.fromEntries(formData.entries());

    console.log("New user:", newUser);

    try {
      const res = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!res.ok) {
        throw new Error("Failed to add user");
      }

      const afterSubmit = await res.json();

      console.log("Response from server:", afterSubmit);

      e.currentTarget.reset();
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleAddNewUser}>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="fieldgroup-name">
              Name
            </FieldLabel>
            <Input
              id="fieldgroup-name"
              name="name"
              placeholder="Jordan Lee"
              required
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="fieldgroup-email">
              Email
            </FieldLabel>
            <Input
              id="fieldgroup-email"
              type="email"
              name="email"
              placeholder="name@example.com"
              required
            />
            <FieldDescription>
              We'll send updates to this address.
            </FieldDescription>
          </Field>

          <Field orientation="horizontal">
            <Button type="reset" variant="outline">
              Reset
            </Button>
            <Button type="submit">
              Add User
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
};

export default NewUsersPage;