import React, { PropsWithChildren, createContext, useState } from "react";


interface User {
  id: string;
  username: string;

}


interface AuthContextType {
  user: User | null;
  handleSetUser: (user: User) => void;
}


export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {

  const [user, setUser] = useState<User | null>(null);


  const handleSetUser = (user: User) => {
    setUser(user);
  };

  return (
    <AuthContext.Provider value={{ user, handleSetUser }}>
      {children}
    </AuthContext.Provider>
  );
};
