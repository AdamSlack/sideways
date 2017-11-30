# Stroke Drivers Screen Assessment 

This directory is for all API/System Logic implementation.

This will include .NET implementation of the REST API


# Install Prequisties

## Ubuntu 16.04
```
sudo sh -c 'echo "deb [arch=amd64] https://apt-mo.trafficmanager.net/repos/dotnet-release/ xenial main" > /etc/apt/sources.list.d/dotnetdev.list'
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys B02C46DF417A0893
sudo apt-get update
```

Install specific version

```
sudo apt-get install dotnet-dev-1.1.0
```


# Once installed ...
Naviage to the directory with the csproj file 
```
cd SDSA
```

# Running application
```
dotnet restore
dotnet publish
dotnet run
```

# Test
Working endpoint route to see -> http://localhost:5000/test/1/index