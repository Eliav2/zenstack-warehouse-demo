/* eslint-disable */
import type { Prisma, Product2Manager } from "@prisma/client";
import type { UseMutationOptions, UseQueryOptions, UseInfiniteQueryOptions, InfiniteData } from '@tanstack/react-query';
import { getHooksContext } from '@zenstackhq/tanstack-query/runtime-v5/react';
import { useModelQuery, useInfiniteModelQuery, useModelMutation } from '@zenstackhq/tanstack-query/runtime-v5/react';
import type { PickEnumerable, CheckSelect, QueryError, ExtraQueryOptions, ExtraMutationOptions } from '@zenstackhq/tanstack-query/runtime-v5';
import type { PolicyCrudKind } from '@zenstackhq/runtime'
import metadata from './__model_meta';
type DefaultError = QueryError;
import { useSuspenseModelQuery, useSuspenseInfiniteModelQuery } from '@zenstackhq/tanstack-query/runtime-v5/react';
import type { UseSuspenseQueryOptions, UseSuspenseInfiniteQueryOptions } from '@tanstack/react-query';

export function useCreateProduct2Manager(options?: Omit<(UseMutationOptions<(Product2Manager | undefined), DefaultError, Prisma.Product2ManagerCreateArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.Product2ManagerCreateArgs, DefaultError, Product2Manager, true>('Product2Manager', 'POST', `${endpoint}/product2Manager/create`, metadata, options, fetch, true)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.Product2ManagerCreateArgs>(
            args: Prisma.SelectSubset<T, Prisma.Product2ManagerCreateArgs>,
            options?: Omit<(UseMutationOptions<(CheckSelect<T, Product2Manager, Prisma.Product2ManagerGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.Product2ManagerCreateArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as (CheckSelect<T, Product2Manager, Prisma.Product2ManagerGetPayload<T>> | undefined);
        },
    };
    return mutation;
}

export function useCreateManyProduct2Manager(options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.Product2ManagerCreateManyArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.Product2ManagerCreateManyArgs, DefaultError, Prisma.BatchPayload, false>('Product2Manager', 'POST', `${endpoint}/product2Manager/createMany`, metadata, options, fetch, false)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.Product2ManagerCreateManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.Product2ManagerCreateManyArgs>,
            options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.SelectSubset<T, Prisma.Product2ManagerCreateManyArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useFindManyProduct2Manager<TArgs extends Prisma.Product2ManagerFindManyArgs, TQueryFnData = Array<Prisma.Product2ManagerGetPayload<TArgs> & { $optimistic?: boolean }>, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.Product2ManagerFindManyArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('Product2Manager', `${endpoint}/product2Manager/findMany`, args, options, fetch);
}

export function useInfiniteFindManyProduct2Manager<TArgs extends Prisma.Product2ManagerFindManyArgs, TQueryFnData = Array<Prisma.Product2ManagerGetPayload<TArgs>>, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.Product2ManagerFindManyArgs>, options?: Omit<UseInfiniteQueryOptions<TQueryFnData, TError, InfiniteData<TData>>, 'queryKey'>) {
    options = options ?? { initialPageParam: undefined, getNextPageParam: () => null };
    const { endpoint, fetch } = getHooksContext();
    return useInfiniteModelQuery<TQueryFnData, TData, TError>('Product2Manager', `${endpoint}/product2Manager/findMany`, args, options, fetch);
}

export function useSuspenseFindManyProduct2Manager<TArgs extends Prisma.Product2ManagerFindManyArgs, TQueryFnData = Array<Prisma.Product2ManagerGetPayload<TArgs> & { $optimistic?: boolean }>, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.Product2ManagerFindManyArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('Product2Manager', `${endpoint}/product2Manager/findMany`, args, options, fetch);
}

export function useSuspenseInfiniteFindManyProduct2Manager<TArgs extends Prisma.Product2ManagerFindManyArgs, TQueryFnData = Array<Prisma.Product2ManagerGetPayload<TArgs>>, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.Product2ManagerFindManyArgs>, options?: Omit<UseSuspenseInfiniteQueryOptions<TQueryFnData, TError, InfiniteData<TData>>, 'queryKey'>) {
    options = options ?? { initialPageParam: undefined, getNextPageParam: () => null };
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseInfiniteModelQuery<TQueryFnData, TData, TError>('Product2Manager', `${endpoint}/product2Manager/findMany`, args, options, fetch);
}

export function useFindUniqueProduct2Manager<TArgs extends Prisma.Product2ManagerFindUniqueArgs, TQueryFnData = Prisma.Product2ManagerGetPayload<TArgs> & { $optimistic?: boolean }, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.Product2ManagerFindUniqueArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('Product2Manager', `${endpoint}/product2Manager/findUnique`, args, options, fetch);
}

export function useSuspenseFindUniqueProduct2Manager<TArgs extends Prisma.Product2ManagerFindUniqueArgs, TQueryFnData = Prisma.Product2ManagerGetPayload<TArgs> & { $optimistic?: boolean }, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.Product2ManagerFindUniqueArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('Product2Manager', `${endpoint}/product2Manager/findUnique`, args, options, fetch);
}

export function useFindFirstProduct2Manager<TArgs extends Prisma.Product2ManagerFindFirstArgs, TQueryFnData = Prisma.Product2ManagerGetPayload<TArgs> & { $optimistic?: boolean }, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.Product2ManagerFindFirstArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('Product2Manager', `${endpoint}/product2Manager/findFirst`, args, options, fetch);
}

export function useSuspenseFindFirstProduct2Manager<TArgs extends Prisma.Product2ManagerFindFirstArgs, TQueryFnData = Prisma.Product2ManagerGetPayload<TArgs> & { $optimistic?: boolean }, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.Product2ManagerFindFirstArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('Product2Manager', `${endpoint}/product2Manager/findFirst`, args, options, fetch);
}

export function useUpdateProduct2Manager(options?: Omit<(UseMutationOptions<(Product2Manager | undefined), DefaultError, Prisma.Product2ManagerUpdateArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.Product2ManagerUpdateArgs, DefaultError, Product2Manager, true>('Product2Manager', 'PUT', `${endpoint}/product2Manager/update`, metadata, options, fetch, true)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.Product2ManagerUpdateArgs>(
            args: Prisma.SelectSubset<T, Prisma.Product2ManagerUpdateArgs>,
            options?: Omit<(UseMutationOptions<(CheckSelect<T, Product2Manager, Prisma.Product2ManagerGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.Product2ManagerUpdateArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as (CheckSelect<T, Product2Manager, Prisma.Product2ManagerGetPayload<T>> | undefined);
        },
    };
    return mutation;
}

export function useUpdateManyProduct2Manager(options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.Product2ManagerUpdateManyArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.Product2ManagerUpdateManyArgs, DefaultError, Prisma.BatchPayload, false>('Product2Manager', 'PUT', `${endpoint}/product2Manager/updateMany`, metadata, options, fetch, false)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.Product2ManagerUpdateManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.Product2ManagerUpdateManyArgs>,
            options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.SelectSubset<T, Prisma.Product2ManagerUpdateManyArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useUpsertProduct2Manager(options?: Omit<(UseMutationOptions<(Product2Manager | undefined), DefaultError, Prisma.Product2ManagerUpsertArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.Product2ManagerUpsertArgs, DefaultError, Product2Manager, true>('Product2Manager', 'POST', `${endpoint}/product2Manager/upsert`, metadata, options, fetch, true)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.Product2ManagerUpsertArgs>(
            args: Prisma.SelectSubset<T, Prisma.Product2ManagerUpsertArgs>,
            options?: Omit<(UseMutationOptions<(CheckSelect<T, Product2Manager, Prisma.Product2ManagerGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.Product2ManagerUpsertArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as (CheckSelect<T, Product2Manager, Prisma.Product2ManagerGetPayload<T>> | undefined);
        },
    };
    return mutation;
}

export function useDeleteProduct2Manager(options?: Omit<(UseMutationOptions<(Product2Manager | undefined), DefaultError, Prisma.Product2ManagerDeleteArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.Product2ManagerDeleteArgs, DefaultError, Product2Manager, true>('Product2Manager', 'DELETE', `${endpoint}/product2Manager/delete`, metadata, options, fetch, true)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.Product2ManagerDeleteArgs>(
            args: Prisma.SelectSubset<T, Prisma.Product2ManagerDeleteArgs>,
            options?: Omit<(UseMutationOptions<(CheckSelect<T, Product2Manager, Prisma.Product2ManagerGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.Product2ManagerDeleteArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as (CheckSelect<T, Product2Manager, Prisma.Product2ManagerGetPayload<T>> | undefined);
        },
    };
    return mutation;
}

export function useDeleteManyProduct2Manager(options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.Product2ManagerDeleteManyArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.Product2ManagerDeleteManyArgs, DefaultError, Prisma.BatchPayload, false>('Product2Manager', 'DELETE', `${endpoint}/product2Manager/deleteMany`, metadata, options, fetch, false)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.Product2ManagerDeleteManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.Product2ManagerDeleteManyArgs>,
            options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.SelectSubset<T, Prisma.Product2ManagerDeleteManyArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useAggregateProduct2Manager<TArgs extends Prisma.Product2ManagerAggregateArgs, TQueryFnData = Prisma.GetProduct2ManagerAggregateType<TArgs>, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.Product2ManagerAggregateArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('Product2Manager', `${endpoint}/product2Manager/aggregate`, args, options, fetch);
}

export function useSuspenseAggregateProduct2Manager<TArgs extends Prisma.Product2ManagerAggregateArgs, TQueryFnData = Prisma.GetProduct2ManagerAggregateType<TArgs>, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.Product2ManagerAggregateArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('Product2Manager', `${endpoint}/product2Manager/aggregate`, args, options, fetch);
}

export function useGroupByProduct2Manager<TArgs extends Prisma.Product2ManagerGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<TArgs>>, Prisma.Extends<'take', Prisma.Keys<TArgs>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? { orderBy: Prisma.Product2ManagerGroupByArgs['orderBy'] } : { orderBy?: Prisma.Product2ManagerGroupByArgs['orderBy'] }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<TArgs['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<TArgs['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<TArgs['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends TArgs['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True
    ? `Error: "by" must not be empty.`
    : HavingValid extends Prisma.False
    ? {
        [P in HavingFields]: P extends ByFields
        ? never
        : P extends string
        ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
        : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`,
        ]
    }[HavingFields]
    : 'take' extends Prisma.Keys<TArgs>
    ? 'orderBy' extends Prisma.Keys<TArgs>
    ? ByValid extends Prisma.True
    ? {}
    : {
        [P in OrderFields]: P extends ByFields
        ? never
        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
    }[OrderFields]
    : 'Error: If you provide "take", you also need to provide "orderBy"'
    : 'skip' extends Prisma.Keys<TArgs>
    ? 'orderBy' extends Prisma.Keys<TArgs>
    ? ByValid extends Prisma.True
    ? {}
    : {
        [P in OrderFields]: P extends ByFields
        ? never
        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
    }[OrderFields]
    : 'Error: If you provide "skip", you also need to provide "orderBy"'
    : ByValid extends Prisma.True
    ? {}
    : {
        [P in OrderFields]: P extends ByFields
        ? never
        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
    }[OrderFields], TQueryFnData = {} extends InputErrors ?
    Array<PickEnumerable<Prisma.Product2ManagerGroupByOutputType, TArgs['by']> &
        {
            [P in ((keyof TArgs) & (keyof Prisma.Product2ManagerGroupByOutputType))]: P extends '_count'
            ? TArgs[P] extends boolean
            ? number
            : Prisma.GetScalarType<TArgs[P], Prisma.Product2ManagerGroupByOutputType[P]>
            : Prisma.GetScalarType<TArgs[P], Prisma.Product2ManagerGroupByOutputType[P]>
        }
    > : InputErrors, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.SubsetIntersection<TArgs, Prisma.Product2ManagerGroupByArgs, OrderByArg> & InputErrors>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('Product2Manager', `${endpoint}/product2Manager/groupBy`, args, options, fetch);
}

export function useSuspenseGroupByProduct2Manager<TArgs extends Prisma.Product2ManagerGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<TArgs>>, Prisma.Extends<'take', Prisma.Keys<TArgs>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? { orderBy: Prisma.Product2ManagerGroupByArgs['orderBy'] } : { orderBy?: Prisma.Product2ManagerGroupByArgs['orderBy'] }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<TArgs['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<TArgs['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<TArgs['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends TArgs['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True
    ? `Error: "by" must not be empty.`
    : HavingValid extends Prisma.False
    ? {
        [P in HavingFields]: P extends ByFields
        ? never
        : P extends string
        ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
        : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`,
        ]
    }[HavingFields]
    : 'take' extends Prisma.Keys<TArgs>
    ? 'orderBy' extends Prisma.Keys<TArgs>
    ? ByValid extends Prisma.True
    ? {}
    : {
        [P in OrderFields]: P extends ByFields
        ? never
        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
    }[OrderFields]
    : 'Error: If you provide "take", you also need to provide "orderBy"'
    : 'skip' extends Prisma.Keys<TArgs>
    ? 'orderBy' extends Prisma.Keys<TArgs>
    ? ByValid extends Prisma.True
    ? {}
    : {
        [P in OrderFields]: P extends ByFields
        ? never
        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
    }[OrderFields]
    : 'Error: If you provide "skip", you also need to provide "orderBy"'
    : ByValid extends Prisma.True
    ? {}
    : {
        [P in OrderFields]: P extends ByFields
        ? never
        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
    }[OrderFields], TQueryFnData = {} extends InputErrors ?
    Array<PickEnumerable<Prisma.Product2ManagerGroupByOutputType, TArgs['by']> &
        {
            [P in ((keyof TArgs) & (keyof Prisma.Product2ManagerGroupByOutputType))]: P extends '_count'
            ? TArgs[P] extends boolean
            ? number
            : Prisma.GetScalarType<TArgs[P], Prisma.Product2ManagerGroupByOutputType[P]>
            : Prisma.GetScalarType<TArgs[P], Prisma.Product2ManagerGroupByOutputType[P]>
        }
    > : InputErrors, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.SubsetIntersection<TArgs, Prisma.Product2ManagerGroupByArgs, OrderByArg> & InputErrors>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('Product2Manager', `${endpoint}/product2Manager/groupBy`, args, options, fetch);
}

export function useCountProduct2Manager<TArgs extends Prisma.Product2ManagerCountArgs, TQueryFnData = TArgs extends { select: any; } ? TArgs['select'] extends true ? number : Prisma.GetScalarType<TArgs['select'], Prisma.Product2ManagerCountAggregateOutputType> : number, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.Product2ManagerCountArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('Product2Manager', `${endpoint}/product2Manager/count`, args, options, fetch);
}

export function useSuspenseCountProduct2Manager<TArgs extends Prisma.Product2ManagerCountArgs, TQueryFnData = TArgs extends { select: any; } ? TArgs['select'] extends true ? number : Prisma.GetScalarType<TArgs['select'], Prisma.Product2ManagerCountAggregateOutputType> : number, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.Product2ManagerCountArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('Product2Manager', `${endpoint}/product2Manager/count`, args, options, fetch);
}

export function useCheckProduct2Manager<TError = DefaultError>(args: { operation: PolicyCrudKind; where?: { id?: string; productId?: string; managerId?: string }; }, options?: (Omit<UseQueryOptions<boolean, TError, boolean>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<boolean, boolean, TError>('Product2Manager', `${endpoint}/product2Manager/check`, args, options, fetch);
}

export function useTransaction<TError = DefaultError>(args: { operation: PolicyCrudKind; where?: { id?: string; productId?: string; managerId?: string }; }, options?: (Omit<UseQueryOptions<boolean, TError, boolean>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<boolean, boolean, TError>('Product2Manager', `${endpoint}/product2Manager/transaction`, args, options, fetch);
}
